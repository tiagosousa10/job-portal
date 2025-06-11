import {Webhook} from 'svix';
import User from '../models/User.js';

// API controller function to manage CLERK USER with database
export const clerkWebhooks = async (req,res) => {
  try {
    // Create a Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //verify Headers
    await whook.verify(JSON.stringify(req.body) , {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature']
    })

    // getting data from the request body
    const {data, type} = req.body; // user created, user updated, user deleted

    // switch case for different Events
    switch(type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + ' ' + data.last_name,
          image: data.image_url,
          resume: '',
        }

        await User.create(userData)
        res.json({
          message: 'User created successfully',
        });
        break;
      }

      case 'user.updated': {
         const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + ' ' + data.last_name,
          image: data.image_url,
        }

        await User.findByIdAndUpdate(data.id, userData) // Update user data
        res.json({
          message: 'User updated successfully',
        });
        break;
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id) // Delete user data
        res.json({
          message: 'User deleted successfully',
        });
        break;
      }


      default: 
        break;
    }

  } catch (error) {
    console.error('Error processing webhook:', error);
    res.json({
      success: false,
      message: 'Internal Server Error while processing webhook',
    });
  }
}
