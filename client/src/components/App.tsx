import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";

// Анимация "пульса"
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 195, 125, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 195, 125, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 195, 125, 0);
  }
`;

// Кнопка (слегка бирюзовая, как у ChatGPT)
const RecordButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: #19c37d;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s infinite;

  &:hover {
    filter: brightness(110%);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Иконка расписания (слева сверху)
const ScheduleIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  color: #888;
`;

// Общий контейнер
const AppContainer = styled.div`
  background: #fff; /* белый фон */
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center; 
  justify-content: center;
`;

// Нижняя панель (диалоговое окно)
const BottomDialog = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;              /* занимает примерно 20% по высоте */
  max-height: 180px;        /* ограничим максимальную высоту, чтобы не было слишком громоздко */
  background-color: #fefefe;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;

  /* Немного отступов по бокам */
  padding: 1rem;
  box-sizing: border-box;

  /* При желании можно сделать панель чуть прозрачной:
     background-color: rgba(255,255,255,0.95); 
  */
`;

// Текст внутри панели
const DialogText = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

function App() {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
  };

  return (
    <AppContainer>
      {/* Иконка расписания */}
      <ScheduleIcon icon={faClock} />

      {/* Кнопка «Запись» */}
      <RecordButton onClick={handleRecordClick}>
        <FontAwesomeIcon icon={faMicrophone} />
      </RecordButton>

      {/* Нижняя панель (диалоговое окно) */}
      <BottomDialog>
        <DialogText>
          {isRecording ? "Сейчас идёт запись..." : "Запись остановлена"}
        </DialogText>
      </BottomDialog>
    </AppContainer>
  );
}

export default App;
