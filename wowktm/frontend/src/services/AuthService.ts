// Local type definitions
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'seller' | 'admin';
  permissions: string[];
  emailVerified: boolean;
  isActive: boolean;
  businessName?: string;
  businessAddress?: string;
  subscribeNewsletter?: boolean;
  createdAt: string;
  lastLogin: string | null;
  avatar?: string;
  bio?: string;
  subscriptionTier?: 'basic' | 'premium' | 'enterprise';
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  userType: 'buyer' | 'seller';
  agreeToTerms: boolean;
  subscribeNewsletter?: boolean;
  businessName?: string;
  businessAddress?: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  strength?: number;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  errors?: AuthError[];
  message?: string;
}

// Email service simulation (in real app, this would be a backend service)
export interface EmailService {
  sendVerificationEmail: (email: string, token: string) => Promise<boolean>;
  sendPasswordResetEmail: (email: string, resetToken: string) => Promise<boolean>;
}

// Mock email service for development
export const mockEmailService: EmailService = {
  sendVerificationEmail: async (email: string, token: string): Promise<boolean> => {
    console.log(`📧 Verification email sent to: ${email}`);
    console.log(`🔗 Verification link: ${window.location.origin}/verify-email?token=${token}`);
    return true;
  },
  
  sendPasswordResetEmail: async (email: string, resetToken: string): Promise<boolean> => {
    console.log(`📧 Password reset email sent to: ${email}`);
    console.log(`🔗 Reset link: ${window.location.origin}/reset-password?token=${resetToken}`);
    return true;
  }
};

// User storage keys
const STORAGE_KEYS = {
  USERS: 'wowktm_users',
  CURRENT_USER: 'wowktm_current_user',
  PENDING_VERIFICATIONS: 'wowktm_pending_verifications',
  RESET_TOKENS: 'wowktm_reset_tokens'
};

class AuthService {
  private static instance: AuthService;
  private emailService: EmailService;

  constructor(emailService: EmailService = mockEmailService) {
    this.emailService = emailService;
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Validation methods
  static validateEmail(email: string): { isValid: boolean; message?: string } {
    if (!email) {
      return { isValid: false, message: 'Email is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    // Additional email format checks
    if (email.length > 254) {
      return { isValid: false, message: 'Email address is too long' };
    }

    const localPart = email.split('@')[0];
    if (localPart.length > 64) {
      return { isValid: false, message: 'Email local part is too long' };
    }

    return { isValid: true };
  }

  static validatePhone(phone: string): { isValid: boolean; message?: string } {
    if (!phone) {
      return { isValid: true }; // Phone is optional
    }

    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10) {
      return { isValid: false, message: 'Phone number must be at least 10 digits' };
    }

    if (cleanPhone.length > 15) {
      return { isValid: false, message: 'Phone number is too long' };
    }

    return { isValid: true };
  }

  static validatePassword(password: string): { isValid: boolean; message?: string; strength?: number } {
    if (!password) {
      return { isValid: false, message: 'Password is required', strength: 0 };
    }

    let strength = 0;
    let messages: string[] = [];

    // Length check
    if (password.length < 8) {
      messages.push('at least 8 characters');
    } else {
      strength += 1;
    }

    // Uppercase check
    if (!/[A-Z]/.test(password)) {
      messages.push('one uppercase letter');
    } else {
      strength += 1;
    }

    // Lowercase check
    if (!/[a-z]/.test(password)) {
      messages.push('one lowercase letter');
    } else {
      strength += 1;
    }

    // Number check
    if (!/\d/.test(password)) {
      messages.push('one number');
    } else {
      strength += 1;
    }

    // Special character check
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      messages.push('one special character');
    } else {
      strength += 1;
    }

    const isValid = messages.length === 0;
    const message = isValid ? undefined : `Password must contain ${messages.join(', ')}`;

    return { isValid, message, strength };
  }

  static validateName(name: string, fieldName: string): { isValid: boolean; message?: string } {
    if (!name?.trim()) {
      return { isValid: false, message: `${fieldName} is required` };
    }

    if (name.trim().length < 2) {
      return { isValid: false, message: `${fieldName} must be at least 2 characters` };
    }

    if (name.trim().length > 50) {
      return { isValid: false, message: `${fieldName} must be less than 50 characters` };
    }

    // Check for invalid characters
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return { isValid: false, message: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
    }

    return { isValid: true };
  }

  // Check if email or phone already exists
  async checkUserExists(email: string, phone?: string): Promise<{ exists: boolean; field?: 'email' | 'phone' }> {
    const users = this.getStoredUsers();
    
    const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return { exists: true, field: 'email' };
    }

    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      const phoneExists = users.some(user => 
        user.phone && user.phone.replace(/\D/g, '') === cleanPhone
      );
      if (phoneExists) {
        return { exists: true, field: 'phone' };
      }
    }

    return { exists: false };
  }

  // User registration
  async signup(data: SignupData): Promise<{ success: boolean; user?: User; errors?: AuthError[] }> {
    const errors: AuthError[] = [];

    // Validate all fields
    const firstNameValidation = AuthService.validateName(data.firstName, 'First name');
    if (!firstNameValidation.isValid) {
      errors.push({ code: 'INVALID_FIRST_NAME', message: firstNameValidation.message!, field: 'firstName' });
    }

    const lastNameValidation = AuthService.validateName(data.lastName, 'Last name');
    if (!lastNameValidation.isValid) {
      errors.push({ code: 'INVALID_LAST_NAME', message: lastNameValidation.message!, field: 'lastName' });
    }

    const emailValidation = AuthService.validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.push({ code: 'INVALID_EMAIL', message: emailValidation.message!, field: 'email' });
    }

    if (data.phone) {
      const phoneValidation = AuthService.validatePhone(data.phone);
      if (!phoneValidation.isValid) {
        errors.push({ code: 'INVALID_PHONE', message: phoneValidation.message!, field: 'phone' });
      }
    }

    const passwordValidation = AuthService.validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.push({ code: 'INVALID_PASSWORD', message: passwordValidation.message!, field: 'password' });
    }

    if (data.password !== data.confirmPassword) {
      errors.push({ code: 'PASSWORD_MISMATCH', message: 'Passwords do not match', field: 'confirmPassword' });
    }

    if (!data.agreeToTerms) {
      errors.push({ code: 'TERMS_NOT_ACCEPTED', message: 'You must agree to the terms and conditions', field: 'agreeToTerms' });
    }

    // Seller-specific validations
    if (data.userType === 'seller') {
      if (!data.businessName?.trim()) {
        errors.push({ code: 'BUSINESS_NAME_REQUIRED', message: 'Business name is required for sellers', field: 'businessName' });
      }
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }

    // Check if user already exists
    const userExists = await this.checkUserExists(data.email, data.phone);
    if (userExists.exists) {
      const message = userExists.field === 'email' 
        ? 'An account with this email address already exists' 
        : 'An account with this phone number already exists';
      
      return { 
        success: false, 
        errors: [{ 
          code: 'USER_EXISTS', 
          message, 
          field: userExists.field 
        }] 
      };
    }

    // Create new user
    const user: User = {
      id: Date.now().toString(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone?.replace(/\D/g, '') || undefined,
      role: data.userType === 'seller' ? 'seller' : 'buyer',
      permissions: data.userType === 'seller' ? ['seller.dashboard', 'products.create'] : ['orders.view'],
      emailVerified: false,
      isActive: true,
      businessName: data.businessName?.trim(),
      businessAddress: data.businessAddress?.trim(),
      subscribeNewsletter: data.subscribeNewsletter || false,
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    // Store user
    const users = this.getStoredUsers();
    users.push({ ...user, password: data.password }); // In real app, password would be hashed
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Generate verification token and send email
    const verificationToken = this.generateToken();
    this.storePendingVerification(user.email, verificationToken);
    await this.emailService.sendVerificationEmail(user.email, verificationToken);

    return { success: true, user };
  }

  // User login
  async login(data: LoginData): Promise<{ success: boolean; user?: User; errors?: AuthError[] }> {
    const emailValidation = AuthService.validateEmail(data.email);
    if (!emailValidation.isValid) {
      return { 
        success: false, 
        errors: [{ code: 'INVALID_EMAIL', message: emailValidation.message!, field: 'email' }] 
      };
    }

    if (!data.password) {
      return { 
        success: false, 
        errors: [{ code: 'PASSWORD_REQUIRED', message: 'Password is required', field: 'password' }] 
      };
    }

    const users = this.getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());

    if (!user || user.password !== data.password) {
      return { 
        success: false, 
        errors: [{ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }] 
      };
    }

    if (!user.isActive) {
      return { 
        success: false, 
        errors: [{ code: 'ACCOUNT_DEACTIVATED', message: 'Your account has been deactivated' }] 
      };
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    this.updateUser(user.id, { lastLogin: user.lastLogin });

    // Store current user
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));

    if (data.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }

    return { success: true, user: userWithoutPassword };
  }

  // Password reset request
  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    const emailValidation = AuthService.validateEmail(email);
    if (!emailValidation.isValid) {
      return { success: false, message: emailValidation.message! };
    }

    const users = this.getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Don't reveal if email exists for security
      return { 
        success: true, 
        message: 'If an account with this email exists, you will receive a password reset link shortly.' 
      };
    }

    const resetToken = this.generateToken();
    this.storeResetToken(email, resetToken);
    await this.emailService.sendPasswordResetEmail(email, resetToken);

    return { 
      success: true, 
      message: 'Password reset link has been sent to your email address.' 
    };
  }

  // Password reset
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const passwordValidation = AuthService.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return { success: false, message: passwordValidation.message! };
    }

    const resetTokens = this.getStoredResetTokens();
    const tokenData = resetTokens[token];

    if (!tokenData || Date.now() > tokenData.expiry) {
      return { success: false, message: 'Invalid or expired reset token' };
    }

    const users = this.getStoredUsers();
    const userIndex = users.findIndex(u => u.email === tokenData.email);

    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    // Update password
    users[userIndex].password = newPassword;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Remove reset token
    delete resetTokens[token];
    localStorage.setItem(STORAGE_KEYS.RESET_TOKENS, JSON.stringify(resetTokens));

    return { success: true, message: 'Password has been reset successfully' };
  }

  // Email verification
  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    const pendingVerifications = this.getStoredPendingVerifications();
    const email = pendingVerifications[token];

    if (!email) {
      return { success: false, message: 'Invalid verification token' };
    }

    const users = this.getStoredUsers();
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    // Mark email as verified
    users[userIndex].emailVerified = true;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Remove pending verification
    delete pendingVerifications[token];
    localStorage.setItem(STORAGE_KEYS.PENDING_VERIFICATIONS, JSON.stringify(pendingVerifications));

    return { success: true, message: 'Email verified successfully' };
  }

  // Logout
  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem('rememberMe');
  }

  // Get current user
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userStr ? JSON.parse(userStr) : null;
  }

  // Helper methods
  private getStoredUsers(): any[] {
    const usersStr = localStorage.getItem(STORAGE_KEYS.USERS);
    return usersStr ? JSON.parse(usersStr) : [];
  }

  private updateUser(userId: string, updates: Partial<User>): void {
    const users = this.getStoredUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private storePendingVerification(email: string, token: string): void {
    const pending = this.getStoredPendingVerifications();
    pending[token] = email;
    localStorage.setItem(STORAGE_KEYS.PENDING_VERIFICATIONS, JSON.stringify(pending));
  }

  private getStoredPendingVerifications(): Record<string, string> {
    const pendingStr = localStorage.getItem(STORAGE_KEYS.PENDING_VERIFICATIONS);
    return pendingStr ? JSON.parse(pendingStr) : {};
  }

  private storeResetToken(email: string, token: string): void {
    const resetTokens = this.getStoredResetTokens();
    resetTokens[token] = {
      email,
      expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    localStorage.setItem(STORAGE_KEYS.RESET_TOKENS, JSON.stringify(resetTokens));
  }

  private getStoredResetTokens(): Record<string, { email: string; expiry: number }> {
    const tokensStr = localStorage.getItem(STORAGE_KEYS.RESET_TOKENS);
    return tokensStr ? JSON.parse(tokensStr) : {};
  }
}

// Export both the class and a default instance
export { AuthService };
export default AuthService;
