import {OutputUserDTO} from "../usecases/dto/user.dto";

export interface FindUserInterface {
    execute(input: string): Promise<OutputUserDTO | undefined>;
}