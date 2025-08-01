
import { type Metadata } from "next";
import NavbarMock from "../components/NavbarMock";
import ShopPage from "../components/Shop/ShopPage";

export const metadata:Metadata = {
  title: 'Shop Walle Cards - Choose Your Perfect Crypto Payment Card',
  description: 'Browse and purchase Walle crypto payment cards in multiple colors. Fast worldwide shipping, secure checkout, and premium quality NFC-enabled cards.',
};

export default function Shop() {
  return (
    <>
    <NavbarMock />
    <ShopPage />
    </>
  );
}