import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ScrollspyExample = () => {
  useEffect(() => {
    const scrollSpy = new window.bootstrap.ScrollSpy(document.body, {
      target: '#list-example',
      smoothScroll: true,
    });

    return () => {
      scrollSpy.dispose();
    };
  }, []);

  return (
    <div className="row">
      <div className="col-4">
        <div id="list-example" className="list-group">
          <a className="list-group-item list-group-item-action" href="#list-item-1">
            Item 1
          </a>
          <a className="list-group-item list-group-item-action" href="#list-item-2">
            Item 2
          </a>
          <a className="list-group-item list-group-item-action" href="#list-item-3">
            Item 3
          </a>
          <a className="list-group-item list-group-item-action" href="#list-item-4">
            Item 4
          </a>
        </div>
      </div>
      <div className="col-8">
        <div
          data-bs-spy="scroll"
          data-bs-target="#list-example"
          data-bs-smooth-scroll="true"
          className="scrollspy-example"
          tabIndex={0}
          style={{ height: '200px', overflowY: 'scroll' }} // You can adjust height and overflow as needed
        >
          <h4 id="list-item-1">Item 1</h4>
          <p>Contenido de Item 1...</p>
          <h4 id="list-item-2">Item 2</h4>
          <p>Contenido de Item 2...</p>
          <h4 id="list-item-3">Item 3</h4>
          <p>Contenido de Item 3...</p>
          <h4 id="list-item-4">Item 4</h4>
          <p>Contenido de Item 4...</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollspyExample;
