class ErroHandler extends Error {
  stausCode : Number
  constructor(message: any,statusCode : Number){
    super(message);
    this.stausCode = statusCode;

    Error.captureStackTrace(this,this.constructor)
  }
}

export default ErroHandler;