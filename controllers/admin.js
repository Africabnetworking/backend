const express = require('express');
const authrouter = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

authrouter.post('/signup', async (req, res) => {
    try {
  
      // Check if user already exists
      const user=await User.findByIdAndUpdate(req.body.id,{
        status:"ban"
      })
    
      // Send email verification link Please click this <a href="${process.env.BASE_URL}/verify-email/${token}">link</a> to verify your email.
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        html:`<!DOCTYPE html>
        <html>
        <head>
        
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Account Disable</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
          /**
           * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
           */
          @media screen {
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 400;
              src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 700;
              src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
          }
          /**
           * Avoid browser level font resizing.
           * 1. Windows Mobile
           * 2. iOS / OSX
           */
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
          /**
           * Remove extra space added to tables and cells in Outlook.
           */
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
          /**
           * Better fluid images in Internet Explorer.
           */
          img {
            -ms-interpolation-mode: bicubic;
          }
          /**
           * Remove blue links for iOS devices.
           */
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
          /**
           * Fix centering issues in Android 4.4.
           */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /**
           * Collapse table borders to avoid space between cells.
           */
          table {
            border-collapse: collapse !important;
          }
          a {
            color: purple;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
          </style>
        
        </head>
        <body style="background-color: #e9ecef;">
        
          <!-- start preheader -->
          <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
            A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
          </div>
          
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
        
            <!-- start logo -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
             
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="center" valign="top" style="padding: 36px 24px;">
                      <a href="https://africabnetworking.ca" target="_blank" style="display: inline-block;">
                        <div src="" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;" />
                      </a>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end logo -->
        
            <!-- start hero -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
            
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                      <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Account Banned</h1>
                    </td>
                  </tr>
                </table>
             
              </td>
            </tr>
          
            <tr>
              <td align="center" bgcolor="#e9ecef">
           
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">Hello ${user.name}, /n We want to inform you that unfortuantely we had to ban your previous Account due to Violation of Our terms and policies. /n Regards</p>
                    </td>
                  </tr>
                 
                  
             
                  
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                      <p style="margin: 0;">Cheers,<br> Africab Networking Canada</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                </table>
           
              </td>
            </tr>
           
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
         
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        
                  <!-- start permission -->
                  <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">You received this email because we received a request for Signup with this mail. If you didn't request for signup you can safely delete this email.</p>
                    </td>
                  </tr>
            
                </table>
             
              </td>
            </tr>
            <!-- end footer -->
        
          </table>
          <!-- end body -->
        
        </body>
        </html>`
      };
      await transporter.sendMail(mailOptions);
  
      // Respond with success message and user data
      res.status(201).json({ message: 'Account Banned', user: savedUser });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Server error' })
    }
  });
  

module.exports = authrouter;