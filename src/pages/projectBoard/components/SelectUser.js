import React, { useState, useEffect } from "react";
import { useFetchUsers } from "../../../hooks/useFetchUsers";
import { useUpdateData } from "../../../hooks/useUpdateData";

// styles & components
import "./SelectUser.css";
import { IoIosClose } from "react-icons/io";

export default function SelectUser({ cardId, document, setUpdateCoworkers }) {
  const { users } = useFetchUsers();
  //此卡片的指派欄位
  const cardAssigner = document.cards.byId[cardId].assignTo;
  const [alreadyAssign, setAlreadyAssign] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [isSelect, setIsSelect] = useState(false);
  const [unAssigner, setUnAssigner] = useState([]);
  const { addCardAssigner, deleteCardAssigner } = useUpdateData();

  useEffect(() => {
    if (users && cardAssigner.length === 0) {
      //如果陣列為0，代表尚未指派過人員
      setEmpty(true);
      setUnAssigner(users);
    } else if (users && cardAssigner.length !== 0) {
      //從所有會員中，將已被選取的會員移除列表
      const result = users.filter((allUser) => {
        return !cardAssigner.find(
          (user) => user.uid === allUser.uid && user.name === allUser.name
        );
      });
      setEmpty(false);
      setAlreadyAssign(cardAssigner);
      setUnAssigner(result);
    }
  }, [cardAssigner, users]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAddAssign = (displayName, uid) => {
    const assignInfo = { displayName, uid };
    addCardAssigner(cardId, assignInfo);
    setUpdateCoworkers((prevData) => {
      return [...prevData, uid];
    });
  };

  const handelDeleteAssign = (displayName, uid) => {
    const assignInfo = { displayName, uid };
    deleteCardAssigner(cardId, assignInfo);
    // setUpdateCoworkers((prevData) => {
    //   return prevData.filter((item) => item !== uid);
    // });
  };

  return (
    <>
      {users && (
        <div className="select-user">
          {!isSelect && (
            <div
              className="select-btn"
              onClick={() => {
                setShowMenu(true);
                setIsSelect(true);
              }}
            >
              {empty && "Select user..."}
              {!empty &&
                !showMenu &&
                alreadyAssign.map((doc) => {
                  const { displayName, uid } = doc;
                  return (
                    <div key={uid} className="name-content">
                      <div className="name-icon">
                        {displayName[0].toUpperCase()}
                      </div>
                      <div>{displayName}</div>
                    </div>
                  );
                })}
            </div>
          )}
          {isSelect && (
            <div className="selecting-area">
              {empty && "Select user..."}
              {!empty &&
                showMenu &&
                alreadyAssign.map((doc) => {
                  const { displayName, uid } = doc;
                  return (
                    <div key={uid} className="name-content">
                      <div className="name-icon">
                        {displayName[0].toUpperCase()}
                      </div>
                      <div>{displayName}</div>
                      <div
                        className="close-icon"
                        onClick={() => {
                          handelDeleteAssign(displayName, uid);
                        }}
                      >
                        <IoIosClose />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {showMenu && (
            <ul className="user-menu">
              {unAssigner.map((user) => {
                const { displayName, uid } = user;
                return (
                  <li
                    key={uid}
                    className="option"
                    onClick={() => {
                      handleAddAssign(displayName, uid);
                      setShowMenu(false);
                      setIsSelect(false);
                    }}
                  >
                    <div className="name-icon">
                      {displayName[0].toUpperCase()}
                    </div>
                    <div>{displayName}</div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
