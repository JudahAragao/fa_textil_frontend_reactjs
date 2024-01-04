import React from "react";
import { IoClose } from "react-icons/io5";

import * as S from './styles'

const Overlay = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return <S.Container onClick={onClose}>
        <S.ContainerModel onClick={(e) => e.stopPropagation()}>
            <S.ModelHeader>
                <button className="modal-close" onClick={onClose}>
                    <IoClose />
                </button>
            </S.ModelHeader>
            <S.ModalBody>
                {children}
            </S.ModalBody>
        </S.ContainerModel>
    </S.Container>
}

export default Overlay