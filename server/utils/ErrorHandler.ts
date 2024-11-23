class ErroHandler extends Error {
  stausCode : Number
  constructor(message: any,statusCode = 500){
    super(message);
    this.stausCode = statusCode;

    Error.captureStackTrace(this,this.constructor)
  }
}

export default ErroHandler;