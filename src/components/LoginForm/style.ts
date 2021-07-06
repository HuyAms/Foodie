import styled from 'styled-components/macro'

export const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  > div {
    margin: 10px auto;
    width: 100%;
    max-width: 300px;
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

export const Input = styled.input`
  border-radius: 3px;
  border: 1px solid #f1f1f4;
  background-color: #f1f2f7;
  padding: 8px 12px;
`
