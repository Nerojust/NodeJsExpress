
module.exports= function setGeneralResponse(input) {
    return {
      code: 200,
      message: "successful",
      recordCount: input.length,
      result: input
    };
  }
