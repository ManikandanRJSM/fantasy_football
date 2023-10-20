const stripe = require('stripe')('sk_test_51LrbdeSBwD3tbrfSslWvCeSYih80ElqsrVTeWuLx6I0U4AoXuTIOuCZHZ912X3CQji30M1kqarhdZcVsztDiGt7C00N4zoMZUW')
const asyncHandler = require('express-async-handler')

const stripePayments = asyncHandler( async (request, response) => {
    // const paymentMethod = await stripe.paymentMethods.create({
    //     type: 'card',
    //     card: {
    //       number: '4242424242424242',
    //       exp_month: 12,
    //       exp_year: 2034,
    //       cvc: '314',
    //     },
    //   });
    // console.log(paymentMethod)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 500,
        currency: 'gbp',
        payment_method: 'pm_card_visa',
        automatic_payment_methods: {enabled: true, allow_redirects: 'never'},
      });
      
    // let trans = await stripe.paymentIntents.create({
    //     payment_method: paymentStripe.id,
    //     amount: 75*100, // USD*100
    //     currency: 'inr',
    //     confirm: true,
    //     payment_method_types: ['card'],
    // })

    const paymentIntentCnfm = await stripe.paymentIntents.confirm(
        paymentIntent.id,
        {payment_method: 'pm_card_visa'}
      );

    return response.status(200).json({stripe_data : paymentIntentCnfm})
})

module.exports = { stripePayments }
