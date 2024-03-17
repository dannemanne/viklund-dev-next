import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tooltip } from "@chakra-ui/react"
import { ChangeEventHandler, FC, useCallback } from "react"
import { EnumSnake, GameBoard, ISnakeConfig } from "./types";
import { maskMiddleText } from "./utils";

type Props = {
  gameBoard: GameBoard;
  snake: EnumSnake;
  onChangeGameBoard: (gameBoard: GameBoard) => void;
  onChangeSnake: (snake: EnumSnake) => void;
  onChangeWalletAddress: (walletAddress: string) => void;
  onClickStart: () => void;
  onClose: () => void;
  walletAddress: string | null;
};

export const StartGameModal: FC<Props> = ({
  gameBoard,
  snake,
  onChangeGameBoard,
  onChangeSnake,
  onChangeWalletAddress,
  onClickStart,
  onClose,
  walletAddress,
}) => {
  const handleChangeGameBoard = useCallback<ChangeEventHandler<HTMLSelectElement>>((e) => {
    onChangeGameBoard(e.target.value as GameBoard);
  }, [onChangeGameBoard]);

  const handleChangeSnakeConfig = useCallback<ChangeEventHandler<HTMLSelectElement>>((e) => {
    onChangeSnake(e.target.value as EnumSnake);
  }, [onChangeSnake]);

  const handleClickUpdateWallet = useCallback(() => {
    const address = prompt("Enter your wallet address to identify your account");
    if (address) {
      onChangeWalletAddress(address);
    }
  }, [onChangeWalletAddress]);

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Start Game
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody gap="4" display="flex" flexDir="column">
          <InputGroup>
            <InputLeftAddon w="120px">
              Wallet
            </InputLeftAddon>
            <Input value={maskMiddleText(walletAddress)} disabled />
          </InputGroup>
          <Button size="sm" onClick={handleClickUpdateWallet} w="full">Update Account Wallet</Button>

          <FormControl>
            <InputGroup>
              <InputLeftAddon w="120px">
                Game Board
              </InputLeftAddon>
              <Select onChange={handleChangeGameBoard} value={gameBoard}>
                {Object.values(GameBoard).map((board) => (
                  <option key={board} value={board}>
                    {board}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftAddon w="120px">
                Snake
              </InputLeftAddon>
              <Select onChange={handleChangeSnakeConfig} value={snake}>
                {Object.values(EnumSnake).map((snake) => (
                  <option key={snake} value={snake}>
                    {snake}
                  </option>
                ))}
              </Select>
            </InputGroup>

          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Tooltip label="You need to have a wallet address to start the game" isDisabled={!!walletAddress}>
            <Button w="full" onClick={onClickStart} isDisabled={!walletAddress}>Start Game</Button>
          </Tooltip>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
