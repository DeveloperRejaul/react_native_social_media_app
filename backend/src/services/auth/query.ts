export function Query() {
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const query = args[args.length-1] || {};
      const option = {};
      const { limit = 10, page = 1, sortField = 'createdAt', sortOrder = 'DESC'} = query;

      // console.log(query);
      option['limit'] = parseInt(limit, 10);
      option['offset'] = parseInt(limit, 10) * (parseInt(page,10)-1);
      option['order'] =  [[sortField, sortOrder.toUpperCase()]];


      const isQueryExists = Object.values(query).length > 0;
      if(!isQueryExists) {
        return originalMethod.apply(this, [...args]);
      };


      // Pass `option` and `total_page` to the original method
      const data = await originalMethod.apply(this, [...args, option]);
      
      const total_doc = await this.model.count(option);
      const total_page = limit > 0 ? Math.ceil(total_doc / limit) : 1;

      return { data, total_page , current_page:parseInt(page, 10), total_count: total_doc};
    };

  };
}