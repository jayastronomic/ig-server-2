import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export default class GetTokenPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value)
    }
}