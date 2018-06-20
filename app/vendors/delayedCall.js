/**
 * Class allowing to call a method only after a specific delay if no other call was made
 * It is useful to prevent triggering the same callback multiple times quickly. For instance
 * ajax calls on keyup. It introduces a delay before triggering the callback
 *
 * Usage:
 * 		var refreshResults = new DelayedCall(1000, function() { alert('Mouse not moved for 1 second'); })
 * 		$('body').mousemove(function() { refreshResults.trigger(); })
 *
 * @param delay Inactivity delay in millisecond before triggering the callback
 * @param callback Callback to trigger after a specific delay
 * @return void
 */
export default (delay, callback) => {
  this.delay = delay
  this.callback = callback
  this.timeout = null

  this.trigger = function () {
    window.clearTimeout(this.timeout)
    this.timeout = setTimeout(this.callback, this.delay)
  }
}
