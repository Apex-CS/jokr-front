import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { TodosContext } from '@/components/contexts/GlobalProvider'; 
import React, { useContext, useEffect, useState } from 'react';

const foo: string = process.env.STRIPE_SECRET_KEY!;
const stripePromise =
  'sk_test_51KCANHGz1RvjBCqBNLdH5eL0UtNp5f16huK8HKR0iN5jJevIIlEP2jwczwWEMklddUIi1TwBLAgUFxpgUgZQEic300NR3BXD7r';
const stripe = new Stripe(stripePromise, {
  apiVersion: '2020-08-27',
});

type CartItemType = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  subcategory: string;
  photoUrl: string;
  amount: number;
};

type CartItemTypeA = {
  id: number;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { cartItems,IdUser } = req.body;
  // const { IdUser } = useContext(TodosContext);

  console.log( "Esta madre si jala" + IdUser?.map((field: CartItemTypeA) => {return field;}));

  const idUser = IdUser?.map((field: CartItemTypeA) => {
    return field.id;
  });
  
  

  const items: {
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: {name: string; description: string; images: [string],metadata:{id:number} };
    };
    quantity: number;
  }[] = [];

  cartItems?.map((product: CartItemType) => {
    console.log(product)
    items.push({
      price_data: {
        currency: 'mxn',
        unit_amount: product.price * 100,
        product_data: {
          name: product.name,
          description: product.description,
          images: [product.photoUrl],
          metadata:{id:product.id}
        },
      },
      quantity: product.amount,
    });
  });

  
  
  

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email:'test@email.com',
    phone_number_collection:{"enabled":true},
    metadata:{
      "id_User": idUser,
      "id_User_test": '2' ,
      "id_Address":'4',
    },
    line_items: items,
    mode: 'payment',
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/User/checkout`,
  });
  




  res.status(200).json({ sessionId: session.id });


};




/*    success_url:'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url:'https://example.com/cancel' */
   /*      {
            price_data: {
              currency: 'mxn',
              unit_amount: 2000,
              product_data: {
                name: 't-shirt',
                description: 'test1',
                images: [
                  'https://res.cloudinary.com/dpakhjsmh/image/upload/v1640749406/Jokr/productsPhoto/o0j4cvrib9fuvrqcacwe.jpg',
                ],
              },
            },
            quantity: 1,
          },
          {
            price_data: {
              currency: 'mxn',
              unit_amount: 3000,
              product_data: {
                name: 't-shot',
                description: 'test2',
                images: [
                  'https://res.cloudinary.com/dpakhjsmh/image/upload/v1640749406/Jokr/productsPhoto/o0j4cvrib9fuvrqcacwe.jpg',
                ],
              },
            },
            quantity: 3,
          }, */