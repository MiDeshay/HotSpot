import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

class LinksItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {name, linkedin, github, title, description, imageClassName, img} = this.props;
    return (
      <div className="links-item-div">
        <div className="links-name">{name}</div>
        <div className={`links-profile-image ${imageClassName}`}><img src={img} className="mugshot"/></div>
        <div className="links-buttons">
          <a href={github}><div className="links-linkedin"><BsGithub /></div></a>
          <a href={linkedin}><div className="links-github"><BsLinkedin /></div></a>
        </div>
        <div className="links-title">{title}</div>
        <div className="links-description">{description}</div>

      </div>
    )
  }
}

export default LinksItem;