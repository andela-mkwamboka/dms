module.exports = {
  // Override res.send
  override: (req, res, next) => {
    const _send = res.send;
    let sent = false;
    res.send = (data) => {
      if (sent) return;
      _send.bind(res)(data);
      sent = true;
    };
    next();
  },
};
