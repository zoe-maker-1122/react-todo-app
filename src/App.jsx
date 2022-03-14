import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  // 入力値うけとり
  const [toDoText, setToDoText] = useState([""]);
  // 未完了リストを配列で格納
  const [incompleteToDos, setIncompleteToDos] = useState([]);
  // 完了リスト
  const [completeToDos, setCompleteToDos] = useState([]);

  // inputの変更検知関数 = 初期空文字から変更できるようにする
  const onChangeToDoText = (event) => setToDoText(event.target.value);

  // 追加ボタン挙動
  const onClickAdd = () => {
    if (toDoText === "") return;
    // newTodosに未完了リストコピー, 入力値を付加
    const newToDos = [...incompleteToDos, toDoText];
    setIncompleteToDos(newToDos);
    setToDoText("");
  };

  // 削除ボタン挙動 indexで位置指定
  const onClickDelete = (index) => {
    // [incompleteToDos]から削除
    const newToDos = [...incompleteToDos];
    //  指定した1行削除
    newToDos.splice(index, 1);
    setIncompleteToDos(newToDos);
  };

  // 完了ボタン挙動 指定行削除 完了への移動
  const onClickComplete = (index) => {
    // 新未完了配列生成、指定行削除
    const newIncompleteToDos = [...incompleteToDos];
    newIncompleteToDos.splice(index, 1);
    // 新完了に現完了をコピー, 新完了に指定された未完了を付加
    const newCompleteToDos = [...completeToDos, incompleteToDos[index]];
    setIncompleteToDos(newIncompleteToDos);
    setCompleteToDos(newCompleteToDos);
  };

  // 戻すボタン挙動 指定行削除 未完了への移動
  const onClickBack = (index) => {
    const newCompleteToDos = [...completeToDos];
    newCompleteToDos.splice(index, 1);
    const newIncompleteToDos = [...incompleteToDos, completeToDos[index]];
    setCompleteToDos(newCompleteToDos);
    setIncompleteToDos(newIncompleteToDos);
  };

  return (
    <>
      <h1>React-ToDo-App</h1>
      <div className="input-area">
        <input
          placeholder="ToDoを入力"
          value={toDoText}
          onChange={onChangeToDoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>

      <div className="incomplete-area">
        <p className="title">未完了のToDo</p>
        <ul>
          {/* 配列をmap()で回す */}
          {incompleteToDos.map((todo, index) => {
            return (
              // ループ使用時、何回目か記すkeyが必要
              <div key="todo" className="list-row">
                <li>{todo}</li>
                {/* アロー関数無しだとクリック時に反映されない */}
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="complete-area">
        <p className="title">完了のToDo</p>
        <ul>
          {completeToDos.map((todo, index) => {
            return (
              <div key="todo" className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
