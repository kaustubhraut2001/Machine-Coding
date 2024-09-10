import React, { useCallback, useEffect, useRef, useState } from 'react';

function Infinitescroll({ renderListItems, textContent, getData, listData }) {
  const pageNo = useRef(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const lastElementObserver = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            pageNo.current++;
            setLoading(true);
            getData(textContent, pageNo.current).finally(() => {
              setLoading(false);
            });
          }
        },
        { threshold: 0.5 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, textContent, getData]
  );

  useEffect(() => {
    setLoading(true);
    getData(textContent, pageNo.current).finally(() => {
      setLoading(false);
    });
  }, [textContent, getData]);

  const renderList = useCallback(() => {
    return listData.map((item, index) => {
      if (index === listData.length - 1) {
        return renderListItems(item, index, lastElementObserver);
      }
      return renderListItems(item, index, null);
    });
  }, [listData, renderListItems, lastElementObserver]);

  return (
    <div>
      {renderList()}
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default Infinitescroll;
