import React, { useContext } from 'react'

import {
  Modal,
  Button,
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Backdrop,
  Fade,
  FormGroup,
  Container,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TodosContext } from '@/components/contexts';

const tableHeader: string[] = ['User', 'Name', 'Options'];

function history() {
  const { Login } = useContext(TodosContext);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  console.log(Login)

    return (
      <Container>
        <FormGroup>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeader?.map((header: string) => {
                    return (
                      <StyledTableCell align="center" key={header}>
                        {header}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
{/*                 {data?.map((user: User) => {
                  return <ListUsers key={user.id} user={user} />;
                })} */}
              </TableBody>
            </Table>
          </TableContainer>
        </FormGroup>
      </Container>
    )
}

export default history
