import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrends } from "../actions/postAction";
import { isEmpty } from "./Utilitaires";
import { NavLink } from "react-router-dom";
import { MDBCard } from "mdbreact";

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.bestofReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 3;
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  return (
    <div>
      <br />
      <h6 style={{textAlign: 'center', fontWeight: 'bold', color:'#17233e'}}>Nos BEST of</h6>
      <NavLink exact to="/bestof">

        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (<MDBCard style={{backgroundColor: '#f5f6fa', border:'1px solid #f39200', borderRadius: "10px"}}>
                <li key={post._id}>
                  <div>
                    {(post.picture[0] !== "") && <img height="200" width='100%' style={{ borderRadius: "10px", paddingBottom: '5px' }} src={post.picture[0]} alt="post-pic" />}
                    {post.video && (
                      <iframe
                        src={post.video}
                        height="200"
                        width='100%'
                        style={{borderRadius: '10px'}}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post._id}
                      ></iframe>
                    )}
                    {isEmpty(post.picture) && isEmpty(post.video) && (
                      <img height="40" style={{ borderRadius: "50%", align: "center" }} src={usersData[0] && usersData.map((user) => {
                        if (user._id === post.posterId) {
                          return user.picture;
                        } else return null;
                      })
                        .join("")
                      } alt="profil-pic" />
                    )}
                  </div>
                  <div className="trend-content">
                    <p>{post.message}</p>
                    <span>Lire</span>
                  </div>
                </li>
              </MDBCard>);
            })}
        </ul>

      </NavLink>
    </div>
  );
};

export default Trends;
