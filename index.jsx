
    import React from "react";
import { FormContact } from "./FormContact";
import heroBanner3 from "./hero-banner-3.png";
import icon from "./icon.svg";
import image12 from "./image-1-2.png";
import image2 from "./image-2.png";
import image from "./image.svg";
import line2 from "./line-2.svg";
import line from "./line.svg";
import profileImage from "./profile-image.png";
import statusBar from "./status-bar.svg";
import "./style.css";
import tabBarItem from "./tab-bar-item.svg";

export const Adicionar = () => {
  return (
    <div className="adicionar">
      <header className="header">
        <img className="profile-image" alt="Profile image" src={profileImage} />

        <div className="text-wrapper-2">MemoFood</div>

        <div className="icon-menu">
          <img className="line" alt="Line" src={line} />

          <img className="img" alt="Line" src={image} />

          <img className="line-2" alt="Line" src={line2} />
        </div>
      </header>

      <div className="tab-bar">
        <div className="tabs">
          <img className="tab-bar-item" alt="Tab bar item" src={tabBarItem} />

          <div className="frame-wrapper">
            <div className="frame">
              <div className="icon-wrapper">
                <img className="icon" alt="Icon" src={icon} />
              </div>
            </div>
          </div>

          <div className="image-wrapper">
            <img className="image" alt="Image" src={image12} />
          </div>

          <div className="img-wrapper">
            <img className="image-2" alt="Image" src={image2} />
          </div>
        </div>

        <div className="home-indicator" />
      </div>

      <div className="text-wrapper-3">Adicionar Produtos</div>

      <img className="status-bar" alt="Status bar" src={statusBar} />

      <img className="hero-banner" alt="Hero banner" src={heroBanner3} />

      <FormContact
        buttonGroupAlignJustifyClassName="form-contact-3"
        buttonGroupButtonLabel="Adicionar"
        buttonGroupButtonVariantPrimaryClassName="form-contact-2"
        className="form-contact-instance"
        inputFieldLabel="Name do Produto"
        inputFieldLabel1="Marca"
        inputFieldLabel2="Data de Validade"
        inputFieldValue="Ex.: Leite Integral"
        inputFieldValue1="Ex.: Italac"
        inputFieldValue2="dd/mm/aaaa"
        visible={false}
      />
    </div>
  );
};
