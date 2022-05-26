import TruncatedAddress from '@components/TruncatedAddress';
import WalletBalance from '@components/WalletBalance';
import SettingsButton from '@components/SettingsButton';
import NotificationModule from '@components/notifications/NotificationModule';
import Navbar from '@components/Navbar';
import useNotificationsStore from 'helpers/store_notifications';

const NotificationsNavBar = ({ onSettingsClick }: { onSettingsClick: () => void }) => {
  const walletAddress = useNotificationsStore((state) => state.walletAddress);
  const walletBalance = useNotificationsStore((state) => state.walletBalance);

  return (
    <Navbar href="/">
      <div className="flex gap-16">
        <TruncatedAddress
          address={walletAddress}
          label="Wallet Address:"
          length={5}
        />
        <WalletBalance
          balance={
            walletBalance ? parseFloat(walletBalance.toFixed(4)) : undefined
          }
        />
        <NotificationModule></NotificationModule>
        <SettingsButton onClick={onSettingsClick}>Settings</SettingsButton>
      </div>
    </Navbar>
  );
};

export default NotificationsNavBar;
