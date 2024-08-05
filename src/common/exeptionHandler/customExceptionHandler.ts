import { HttpException, HttpStatus } from "@nestjs/common";

function Exception(msg: string) {
    throw new HttpException("INTERNAL SERVER ERROR: " + msg, HttpStatus.INTERNAL_SERVER_ERROR);
}

function NotfoundException(object: string, id: string) {
    throw new HttpException("OBJECT NOT FOUND EXCEPTION: " + object  + ' was not found. ID: ' + id, HttpStatus.NOT_FOUND);
}

export {
    NotfoundException,
    Exception
}