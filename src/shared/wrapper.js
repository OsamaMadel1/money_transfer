const wrapper = fn =>(request,response,next)=> Promise.resolve(fn(request,response,next)).catch(next);
// error ===> next ===> errorHandler
export default wrapper;

