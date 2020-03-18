export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
      console.log(3123);
    },
  },
};
