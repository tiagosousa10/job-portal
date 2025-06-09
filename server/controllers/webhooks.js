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
      case 'user.created': {}
      case 'user.updated': {}
      case 'user.deleted': {}
      default: 
        break;
    }

  } catch (error) {

  }
}
