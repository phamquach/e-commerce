export async function processCheckout(req, res) {
  return res.status(200).json({
    message: "Checkout processed successfully",
    data: req.body,
  });
}
