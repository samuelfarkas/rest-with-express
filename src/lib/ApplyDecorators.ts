/**
 * Function that returns a new decorator that applies all decorators provided by param
 *
 * Useful to build new decorators (or a decorator factory) encapsulating multiple decorators related with the same feature
 *
 * @param decorators one or more decorators
 *
 * Yoinked from: https://github.com/nestjs/nest/blob/master/packages/common/decorators/core/apply-decorators.ts
 */
export function applyDecorators(
    ...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>
) {
    return <TFunction extends Function, Y>(
        target: TFunction | object,
        propertyKey?: string | symbol,
        descriptor?: TypedPropertyDescriptor<Y>
    ) => {
        for (const decorator of decorators) {
            if (target instanceof Function && !descriptor) {
                (decorator as ClassDecorator)(target);
                continue;
            }
            (decorator as MethodDecorator | PropertyDecorator)(
                target,
                propertyKey,
                descriptor
            );
        }
    };
}
