import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import style from './styles.scss';

const StatusItem = (props) => {
  const {
    icon,
    imageSrc,
    imageWhite = false,
    serverKey,
    text,
    updateOnlineStatus,
    url,
  } = props;
  const [status, setStatus] = useState('unknown');
  const [dns, setDns] = useState(null);

  function iconOrImg() {
    if (icon) {
      return <i className={`${icon} ${style.fa}`}/>;
    } else if (imageSrc) {
      return <img src={imageSrc} />;
    } else
      return null;
  }

  const handleClick = async (e) => {
    e.preventDefault();

    if (status !== 'pending') {
      setStatus('pending');
      try {
        const response = await axios.get(url);
        const serverStatus = response.data.serverStatus[serverKey];

        if (serverStatus) {
          setStatus(serverStatus.state);
          setDns(serverStatus.dns);
          updateOnlineStatus({ serverKey, status: serverStatus.state, dns: serverStatus.dns })
        } else {
          updateOnlineStatus(null);
        }
      } catch(err) {
        setStatus('error');
        updateOnlineStatus(null);
      }
    }
  };

  return (
    <a
      className={`${style.item} ${style[status]}`}
      href={'#'}
      onClick={handleClick}
    >
      {iconOrImg()}
      <h4>{text}</h4>
    </a>
  );
};

export default StatusItem;
