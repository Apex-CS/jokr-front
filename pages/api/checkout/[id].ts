import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe'

const stripePromise = 'sk_test_51KCANHGz1RvjBCqBNLdH5eL0UtNp5f16huK8HKR0iN5jJevIIlEP2jwczwWEMklddUIi1TwBLAgUFxpgUgZQEic300NR3BXD7r'
const stripe = new Stripe(stripePromise, {
    apiVersion:'2020-08-27'
});


export default async(req: NextApiRequest, res:NextApiResponse) => {
    const {id} = req.query;
    const session = await stripe.checkout.sessions.retrieve(id as string,{expand: ['payment_intent']} )
    res.status(200).json({session})
}