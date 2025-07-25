import React from 'react';

// Base email template component with consistent styling
interface EmailTemplateProps {
  children: React.ReactNode;
  previewText?: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ children, previewText }) => {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {previewText && (
        <div style={{
          display: 'none',
          fontSize: '1px',
          color: '#fefefe',
          lineHeight: '1px',
          maxHeight: '0px',
          maxWidth: '0px',
          opacity: 0,
          overflow: 'hidden'
        }}>
          {previewText}
        </div>
      )}
      
      <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{
        backgroundColor: '#f8fafc',
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%'
      }}>
        <tr>
          <td align="center" valign="top" style={{ padding: '20px 0' }}>
            <table cellPadding="0" cellSpacing="0" border={0} width="600" style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <tr>
                <td style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '40px 40px 30px 40px',
                  textAlign: 'center'
                }}>
                  <img src="https://via.placeholder.com/150x50/ffffff/667eea?text=WOWKTM" 
                       alt="WOWKTM" 
                       style={{ maxWidth: '150px', height: 'auto' }} />
                </td>
              </tr>
              
              {/* Content */}
              <tr>
                <td style={{ padding: '0' }}>
                  {children}
                </td>
              </tr>
              
              {/* Footer */}
              <tr>
                <td style={{
                  backgroundColor: '#1f2937',
                  color: '#ffffff',
                  padding: '30px 40px',
                  textAlign: 'center',
                  fontSize: '14px',
                  lineHeight: '20px'
                }}>
                  <div style={{ marginBottom: '20px' }}>
                    <a href="#" style={{ color: '#60a5fa', textDecoration: 'none', margin: '0 10px' }}>Support</a>
                    <span style={{ color: '#9ca3af' }}>|</span>
                    <a href="#" style={{ color: '#60a5fa', textDecoration: 'none', margin: '0 10px' }}>Privacy Policy</a>
                    <span style={{ color: '#9ca3af' }}>|</span>
                    <a href="#" style={{ color: '#60a5fa', textDecoration: 'none', margin: '0 10px' }}>Terms of Service</a>
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                    © 2024 WOWKTM. All rights reserved.<br />
                    123 E-commerce Street, Digital City, DC 12345
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
};

// Order confirmation email template
interface OrderConfirmationProps {
  orderNumber: string;
  customerName: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  estimatedDelivery: string;
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationProps> = ({
  orderNumber,
  customerName,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
  estimatedDelivery,
}) => {
  return (
    <EmailTemplate previewText={`Order ${orderNumber} confirmed - Thank you for your purchase!`}>
      {/* Hero Section */}
      <div style={{ padding: '40px 40px 30px 40px', textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#10b981',
          borderRadius: '50%',
          margin: '0 auto 20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#ffffff', fontSize: '24px' }}>✓</span>
        </div>
        <h1 style={{
          color: '#1f2937',
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          lineHeight: '34px'
        }}>
          Order Confirmed!
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0 0 20px 0'
        }}>
          Hi {customerName}, thanks for your order. We're getting it ready to ship.
        </p>
      </div>

      {/* Order Details */}
      <div style={{ padding: '0 40px' }}>
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#374151', fontWeight: '600' }}>Order Number:</span>
            <span style={{ color: '#1f2937', fontWeight: 'bold' }}>{orderNumber}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#374151', fontWeight: '600' }}>Order Date:</span>
            <span style={{ color: '#6b7280' }}>{orderDate}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151', fontWeight: '600' }}>Estimated Delivery:</span>
            <span style={{ color: '#059669', fontWeight: '600' }}>{estimatedDelivery}</span>
          </div>
        </div>

        {/* Order Items */}
        <h2 style={{
          color: '#1f2937',
          fontSize: '20px',
          fontWeight: 'bold',
          margin: '0 0 20px 0'
        }}>
          Order Items
        </h2>
        
        {items.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '15px 0',
            borderBottom: index < items.length - 1 ? '1px solid #e5e7eb' : 'none'
          }}>
            {item.image && (
              <img src={item.image} alt={item.name} style={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginRight: '15px'
              }} />
            )}
            <div style={{ flex: 1 }}>
              <h3 style={{
                color: '#1f2937',
                fontSize: '16px',
                fontWeight: '600',
                margin: '0 0 5px 0'
              }}>
                {item.name}
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '14px',
                margin: '0'
              }}>
                Quantity: {item.quantity}
              </p>
            </div>
            <div style={{
              color: '#1f2937',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        {/* Order Summary */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          padding: '20px',
          margin: '30px 0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#6b7280' }}>Subtotal:</span>
            <span style={{ color: '#1f2937' }}>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#6b7280' }}>Shipping:</span>
            <span style={{ color: '#1f2937' }}>${shipping.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <span style={{ color: '#6b7280' }}>Tax:</span>
            <span style={{ color: '#1f2937' }}>${tax.toFixed(2)}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '15px',
            borderTop: '2px solid #e5e7eb'
          }}>
            <span style={{ color: '#1f2937', fontSize: '18px', fontWeight: 'bold' }}>Total:</span>
            <span style={{ color: '#1f2937', fontSize: '18px', fontWeight: 'bold' }}>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <h2 style={{
          color: '#1f2937',
          fontSize: '20px',
          fontWeight: 'bold',
          margin: '0 0 15px 0'
        }}>
          Shipping Address
        </h2>
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ color: '#1f2937', lineHeight: '24px' }}>
            <strong>{shippingAddress.name}</strong><br />
            {shippingAddress.address}<br />
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', margin: '30px 0 40px 0' }}>
          <a href="#" style={{
            backgroundColor: '#667eea',
            color: '#ffffff',
            padding: '12px 30px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            Track Your Order
          </a>
        </div>
      </div>
    </EmailTemplate>
  );
};

// Shipping notification email template
interface ShippingNotificationProps {
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
}

export const ShippingNotificationEmail: React.FC<ShippingNotificationProps> = ({
  orderNumber,
  customerName,
  trackingNumber,
  carrier,
  estimatedDelivery,
  items,
}) => {
  return (
    <EmailTemplate previewText={`Your order ${orderNumber} has shipped!`}>
      {/* Hero Section */}
      <div style={{ padding: '40px 40px 30px 40px', textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          margin: '0 auto 20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#ffffff', fontSize: '24px' }}>🚚</span>
        </div>
        <h1 style={{
          color: '#1f2937',
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          lineHeight: '34px'
        }}>
          Your Order Has Shipped!
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0 0 20px 0'
        }}>
          Hi {customerName}, your order is on its way!
        </p>
      </div>

      {/* Tracking Info */}
      <div style={{ padding: '0 40px' }}>
        <div style={{
          backgroundColor: '#eff6ff',
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: '#1e40af',
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '0 0 15px 0'
          }}>
            Tracking Information
          </h2>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#374151', fontWeight: '600' }}>Tracking Number: </span>
            <span style={{ color: '#1f2937', fontWeight: 'bold', fontSize: '16px' }}>{trackingNumber}</span>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ color: '#374151', fontWeight: '600' }}>Carrier: </span>
            <span style={{ color: '#1f2937' }}>{carrier}</span>
          </div>
          <a href="#" style={{
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            padding: '10px 25px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            Track Package
          </a>
        </div>

        {/* Order Details */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#374151', fontWeight: '600' }}>Order Number:</span>
            <span style={{ color: '#1f2937', fontWeight: 'bold' }}>{orderNumber}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151', fontWeight: '600' }}>Estimated Delivery:</span>
            <span style={{ color: '#059669', fontWeight: '600' }}>{estimatedDelivery}</span>
          </div>
        </div>

        {/* Shipped Items */}
        <h2 style={{
          color: '#1f2937',
          fontSize: '20px',
          fontWeight: 'bold',
          margin: '0 0 20px 0'
        }}>
          Shipped Items
        </h2>
        
        {items.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: index < items.length - 1 ? '1px solid #e5e7eb' : 'none'
          }}>
            <span style={{ color: '#1f2937', fontWeight: '600' }}>{item.name}</span>
            <span style={{ color: '#6b7280' }}>Qty: {item.quantity}</span>
          </div>
        ))}
        
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            lineHeight: '20px',
            margin: '0'
          }}>
            We'll send you another email when your package arrives. If you have any questions, 
            feel free to contact our support team.
          </p>
        </div>
      </div>
    </EmailTemplate>
  );
};

// Password reset email template
interface PasswordResetProps {
  customerName: string;
  resetLink: string;
  expirationTime: string;
}

export const PasswordResetEmail: React.FC<PasswordResetProps> = ({
  customerName,
  resetLink,
  expirationTime,
}) => {
  return (
    <EmailTemplate previewText="Reset your WOWKTM password">
      {/* Hero Section */}
      <div style={{ padding: '40px 40px 30px 40px', textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#f59e0b',
          borderRadius: '50%',
          margin: '0 auto 20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#ffffff', fontSize: '24px' }}>🔒</span>
        </div>
        <h1 style={{
          color: '#1f2937',
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          lineHeight: '34px'
        }}>
          Reset Your Password
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0 0 20px 0'
        }}>
          Hi {customerName}, we received a request to reset your password.
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '0 40px 40px 40px' }}>
        <p style={{
          color: '#374151',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0 0 30px 0'
        }}>
          Click the button below to create a new password. This link will expire in {expirationTime}.
        </p>
        
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a href={resetLink} style={{
            backgroundColor: '#f59e0b',
            color: '#ffffff',
            padding: '14px 35px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            Reset Password
          </a>
        </div>

        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '6px',
          padding: '15px',
          margin: '30px 0'
        }}>
          <p style={{
            color: '#92400e',
            fontSize: '14px',
            lineHeight: '20px',
            margin: '0'
          }}>
            <strong>Security Note:</strong> If you didn't request this password reset, please ignore this email or contact our support team if you have concerns about your account security.
          </p>
        </div>

        <p style={{
          color: '#6b7280',
          fontSize: '14px',
          lineHeight: '20px',
          margin: '0'
        }}>
          If the button above doesn't work, copy and paste this link into your browser:<br />
          <a href={resetLink} style={{ color: '#3b82f6', wordBreak: 'break-all' }}>{resetLink}</a>
        </p>
      </div>
    </EmailTemplate>
  );
};

// Email verification template
interface EmailVerificationProps {
  customerName: string;
  verificationLink: string;
}

export const EmailVerificationEmail: React.FC<EmailVerificationProps> = ({
  customerName,
  verificationLink,
}) => {
  return (
    <EmailTemplate previewText="Verify your WOWKTM email address">
      {/* Hero Section */}
      <div style={{ padding: '40px 40px 30px 40px', textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#10b981',
          borderRadius: '50%',
          margin: '0 auto 20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#ffffff', fontSize: '24px' }}>📧</span>
        </div>
        <h1 style={{
          color: '#1f2937',
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          lineHeight: '34px'
        }}>
          Welcome to WOWKTM!
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0 0 20px 0'
        }}>
          Hi {customerName}, please verify your email address to get started.
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '0 40px 40px 40px' }}>
        <p style={{
          color: '#374151',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0 0 30px 0'
        }}>
          Thanks for signing up! To complete your registration and start shopping, please verify your email address by clicking the button below.
        </p>
        
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a href={verificationLink} style={{
            backgroundColor: '#10b981',
            color: '#ffffff',
            padding: '14px 35px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            Verify Email Address
          </a>
        </div>

        <div style={{
          backgroundColor: '#ecfdf5',
          border: '1px solid #10b981',
          borderRadius: '6px',
          padding: '20px',
          margin: '30px 0',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#065f46',
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 0 10px 0'
          }}>
            What's Next?
          </h3>
          <p style={{
            color: '#047857',
            fontSize: '14px',
            lineHeight: '20px',
            margin: '0'
          }}>
            Once verified, you'll be able to browse products, make purchases, track orders, and access your personalized dashboard.
          </p>
        </div>

        <p style={{
          color: '#6b7280',
          fontSize: '14px',
          lineHeight: '20px',
          margin: '0'
        }}>
          If the button above doesn't work, copy and paste this link into your browser:<br />
          <a href={verificationLink} style={{ color: '#3b82f6', wordBreak: 'break-all' }}>{verificationLink}</a>
        </p>
      </div>
    </EmailTemplate>
  );
};

// Promotional email template
interface PromotionalEmailProps {
  customerName: string;
  title: string;
  subtitle: string;
  offerText: string;
  ctaText: string;
  ctaLink: string;
  products?: Array<{
    name: string;
    originalPrice: number;
    salePrice: number;
    image: string;
    link: string;
  }>;
  expirationDate: string;
}

export const PromotionalEmail: React.FC<PromotionalEmailProps> = ({
  customerName,
  title,
  subtitle,
  offerText,
  ctaText,
  ctaLink,
  products = [],
  expirationDate,
}) => {
  return (
    <EmailTemplate previewText={`${title} - Limited time offer for ${customerName}`}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 40px 30px 40px',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          lineHeight: '38px'
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '26px',
          margin: '0 0 20px 0',
          opacity: 0.9
        }}>
          {subtitle}
        </p>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '20px',
          margin: '20px 0'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>
            {offerText}
          </div>
          <div style={{
            fontSize: '14px',
            opacity: 0.8
          }}>
            Expires {expirationDate}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 40px 20px 40px' }}>
        <p style={{
          color: '#374151',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0 0 30px 0',
          textAlign: 'center'
        }}>
          Hi {customerName}, don't miss out on these amazing deals!
        </p>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', margin: '30px 0 40px 0' }}>
          <a href={ctaLink} style={{
            backgroundColor: '#ef4444',
            color: '#ffffff',
            padding: '16px 40px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: '600',
            display: 'inline-block',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {ctaText}
          </a>
        </div>

        {/* Featured Products */}
        {products.length > 0 && (
          <>
            <h2 style={{
              color: '#1f2937',
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '40px 0 30px 0',
              textAlign: 'center'
            }}>
              Featured Deals
            </h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
              {products.slice(0, 3).map((product, index) => (
                <div key={index} style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  width: '160px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <img src={product.image} alt={product.name} style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginBottom: '15px'
                  }} />
                  <h3 style={{
                    color: '#1f2937',
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: '0 0 10px 0',
                    lineHeight: '18px'
                  }}>
                    {product.name}
                  </h3>
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{
                      color: '#9ca3af',
                      fontSize: '12px',
                      textDecoration: 'line-through',
                      marginRight: '5px'
                    }}>
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span style={{
                      color: '#ef4444',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                      ${product.salePrice.toFixed(2)}
                    </span>
                  </div>
                  <a href={product.link} style={{
                    backgroundColor: '#667eea',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    Shop Now
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Urgency Banner */}
        <div style={{
          backgroundColor: '#fef2f2',
          border: '2px solid #fecaca',
          borderRadius: '8px',
          padding: '20px',
          margin: '40px 0',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#dc2626',
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 5px 0'
          }}>
            ⏰ Limited Time Only!
          </p>
          <p style={{
            color: '#991b1b',
            fontSize: '14px',
            margin: '0'
          }}>
            This exclusive offer expires on {expirationDate}. Don't wait!
          </p>
        </div>
      </div>
    </EmailTemplate>
  );
};

export default {
  EmailTemplate,
  OrderConfirmationEmail,
  ShippingNotificationEmail,
  PasswordResetEmail,
  EmailVerificationEmail,
  PromotionalEmail,
};
