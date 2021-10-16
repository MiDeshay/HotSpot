import React from "react";
import LinksItemContainer from "./links_item_container";

class LinksShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="links-div">
        <div className="links-header">
          Development Team
        </div>
        <div className="links-body">
          <div className="links-list">
            <LinksItemContainer name="Michael Deshay" github="https://github.com/MiDeshay" linkedin="https://www.linkedin.com/in/michael-deshay-a76472220/" title="Engineering Lead" description="" imageClassName="mugshot-michael" img="../images/mugshot_michael.jpg"/>
            <LinksItemContainer name="Kenny La" github="https://github.com/tkla" linkedin="https://www.linkedin.com/in/thong-la-78aa58177/" title="Backend Engineer & API Specialist" description="" imageClassName="mugshot-kenny" img="../images/mugshot_kenny.jpeg"/>
            <LinksItemContainer name="Ian McGrath" github="https://github.com/IanDMcGrath" linkedin="https://www.linkedin.com/in/ianmcgrath-techartist/" title="Frontend Engineer" description="" imageClassName="mugshot-ian" img="../images/mugshot_ian.jpeg"/>
          </div>
        </div>
        <div className="links-footer">

        </div>
      </div>
    )
  }
}

export default LinksShow;