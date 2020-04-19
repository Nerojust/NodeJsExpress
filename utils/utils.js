
module.exports= function setGeneralResponse(input) {
    return {
      code: 200,
      message: "Request successful again",
      recordCount: input.length,
      result: input
    };
  }
