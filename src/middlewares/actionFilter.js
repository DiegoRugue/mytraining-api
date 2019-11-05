export default controller => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (ex) {
    if (ex.code && ex.message) res.error(ex.code, ex.message);
    console.log(ex);
    res.badRequest();
  }
};
