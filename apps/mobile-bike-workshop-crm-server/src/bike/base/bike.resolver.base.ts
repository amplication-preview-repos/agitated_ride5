/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { Bike } from "./Bike";
import { BikeCountArgs } from "./BikeCountArgs";
import { BikeFindManyArgs } from "./BikeFindManyArgs";
import { BikeFindUniqueArgs } from "./BikeFindUniqueArgs";
import { CreateBikeArgs } from "./CreateBikeArgs";
import { UpdateBikeArgs } from "./UpdateBikeArgs";
import { DeleteBikeArgs } from "./DeleteBikeArgs";
import { CustomerFindManyArgs } from "../../customer/base/CustomerFindManyArgs";
import { Customer } from "../../customer/base/Customer";
import { BikeService } from "../bike.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Bike)
export class BikeResolverBase {
  constructor(
    protected readonly service: BikeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Bike",
    action: "read",
    possession: "any",
  })
  async _bikesMeta(
    @graphql.Args() args: BikeCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Bike])
  @nestAccessControl.UseRoles({
    resource: "Bike",
    action: "read",
    possession: "any",
  })
  async bikes(@graphql.Args() args: BikeFindManyArgs): Promise<Bike[]> {
    return this.service.bikes(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Bike, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Bike",
    action: "read",
    possession: "own",
  })
  async bike(@graphql.Args() args: BikeFindUniqueArgs): Promise<Bike | null> {
    const result = await this.service.bike(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Bike)
  @nestAccessControl.UseRoles({
    resource: "Bike",
    action: "create",
    possession: "any",
  })
  async createBike(@graphql.Args() args: CreateBikeArgs): Promise<Bike> {
    return await this.service.createBike({
      ...args,
      data: args.data,
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Bike)
  @nestAccessControl.UseRoles({
    resource: "Bike",
    action: "update",
    possession: "any",
  })
  async updateBike(@graphql.Args() args: UpdateBikeArgs): Promise<Bike | null> {
    try {
      return await this.service.updateBike({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Bike)
  @nestAccessControl.UseRoles({
    resource: "Bike",
    action: "delete",
    possession: "any",
  })
  async deleteBike(@graphql.Args() args: DeleteBikeArgs): Promise<Bike | null> {
    try {
      return await this.service.deleteBike(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Customer], { name: "customers" })
  @nestAccessControl.UseRoles({
    resource: "Customer",
    action: "read",
    possession: "any",
  })
  async findCustomers(
    @graphql.Parent() parent: Bike,
    @graphql.Args() args: CustomerFindManyArgs
  ): Promise<Customer[]> {
    const results = await this.service.findCustomers(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
}
