import { v4 } from "uuid";

const initialBoard1_ID = v4();
const initialBoard2_ID = v4();
const initialBoard3_ID = v4();

const initialState = {
  title: "專案標題",
  boards: {
    ids: [initialBoard1_ID, initialBoard2_ID, initialBoard3_ID],
    byId: {
      [initialBoard1_ID]: {
        name: "待處理",
        cardIds: ["card1", "card2"],
      },
      [initialBoard2_ID]: {
        name: "進行中",
        cardIds: ["card3", "card4"],
      },
      [initialBoard3_ID]: {
        name: "已完成",
        cardIds: ["card5", "card6"],
      },
    },
  },
  cards: {
    byId: {
      card1: "待處理事項1",
      card2: "待處理事項2",
      card3: "進行中事項1",
      card4: "進行中事項2",
      card5: "已完成事項1",
      card6: "已完成事項2",
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    //編輯標題
    case "CHANGE_TITLE": {
      const { title } = action.payload;
      return { ...state, title };
    }

    //新增看板
    case "ADD_BOARD": {
      const boardId = v4();
      const { boardName } = action.payload;
      return {
        ...state,
        boards: {
          ids: [...state.boards.ids, boardId],
          byId: {
            ...state.boards.byId,
            [boardId]: {
              name: boardName,
              cardIds: [],
            },
          },
        },
      };
    }

    //修改看板名稱
    case "CHANGE_BOARD_NAME": {
      const { boardName, boardId } = action.payload;
      return {
        ...state,
        boards: {
          ...state.boards,
          byId: {
            ...state.boards.byId,
            [boardId]: {
              ...state.boards.byId[boardId],
              name: boardName,
            },
          },
        },
      };
    }

    // 新增卡片
    case "ADD_CARD": {
      const cardId = v4();
      const { boardId, cardValue } = action.payload;
      return {
        ...state,
        boards: {
          ...state.boards,
          byId: {
            ...state.boards.byId,
            [boardId]: {
              ...state.boards.byId[boardId],
              cardIds: [...state.boards.byId[boardId].cardIds, cardId],
            },
          },
        },
        cards: {
          byId: {
            ...state.cards.byId,
            [cardId]: cardValue,
          },
        },
      };
    }

    // 修改卡片內容
    case "CHANGE_CARD_VALUE": {
      const { cardId, cardValue } = action.payload;
      return {
        ...state,
        cards: {
          byId: {
            ...state.cards.byId,
            [cardId]: cardValue,
          },
        },
      };
    }
  }
};

export { reducer, initialState };
