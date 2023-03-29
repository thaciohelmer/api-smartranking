import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';


@Injectable()
export default class PlayersParametersValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if (!value || value.trim().length === 0) {
      throw new BadRequestException(`The value of the ${metadata.data} parameter must be informed`)
    }

    return value
  }
}