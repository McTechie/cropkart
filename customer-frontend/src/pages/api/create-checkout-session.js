const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email, phone } = req.body;

  const transformedItems = items.map(item => ({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione commodi quis pariatur voluptatum veritatis, possimus, necessitatibus quaerat iusto ad harum officia odio laborum magnam molestias consectetur corporis aliquam expedita error.',
    quantity: item.count,
    price_data: {
      currency: 'inr',
      unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        images: [item.image]
      }
    }
  }));

  let shippingRates = ['shr_1LITnqSBBKaXGd14nyEyqBUJ'];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA', 'IN']
    },
    shipping_rates: shippingRates,
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/basket`,
    metadata: {
      email,
      phone,
      images: JSON.stringify(items.map(item => item.image))
    }
  });

  res.status(200).json({ id: session.id });
}
