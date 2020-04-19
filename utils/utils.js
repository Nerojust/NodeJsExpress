
module.exports= function setGeneralResponse(input) {
    return {
      code: 200,
      message: "Request successful",
      recordCount: input.length,
      result: input
    };
  }
