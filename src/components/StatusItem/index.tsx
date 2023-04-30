import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Item from '../Item';

type Props = {
  icon: string;
  imageSrc: string;
  imageWhite?: boolean;
  serverKey: string;
  text: string;
  updateOnlineStatus: (params: any) => void;
  url: string;
};

const StatusItem: React.FC<Props> = (props) => {
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

  const handleClick = useCallback<
    (e: React.MouseEvent<HTMLElement>) => void
  >(async (e) => {
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
  }, [serverKey, status, url]);

  return (
    <Item
      icon={icon}
      imageSrc={imageSrc}
      imageWhite={imageWhite}
      onClick={handleClick}
      status={status}
      text={text}
    />
  );
};

export default StatusItem;
