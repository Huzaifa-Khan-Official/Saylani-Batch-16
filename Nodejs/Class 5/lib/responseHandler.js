const successRes = (res, statusCode, status, message, data) =>{
  res.status(statusCode).json({
    status,
    message,
    data
  })
}

const errorRes = (res, statusCode, status, message, data) =>{
  res.status(statusCode).json({
    status,
    message,
    data
  })
}

export { successRes, errorRes }