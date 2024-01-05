import styled from "styled-components";

export const Container = styled.div`
    width: 1084px;
    height: 100%;

    div.input-forms-group {
        display: flex;
        width: 100%;

        div.form-left, div.form-right {
            width: 542px;
            height: 100%;
        }

        div.form-left {
            margin-right: 20px;

            div.btn-group{
                margin-top: 10px;
            }
        }

        div.form-right {
            margin-left: 20px;
        }
    }
`