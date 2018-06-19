const _ = require('lodash');
/**
 * using async middleware to catch the errors so we don't need to do try catch in async await
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function asyncMiddleware(fn) {
  return _.partial((req, res, next, handler) => {
    Promise.resolve(fn(req, res, next, handler)).catch(
      err => (_.isFunction(handler) ? handler(err, req, res, next) : next(err))
    );
  }, ...[_, _, _]);
}

module.exports = {
  asyncMiddleware
};
