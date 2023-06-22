function validate(input) {
    let errors = {};
  
    if (!input.name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(input.name)) {
      errors.name = "Name cannot contain numbers";
    }
  
    if (!input.height_min) {
      errors.height_min = "height_min must be completed";
    } else if (
      !/^\d+(\.\d+)?$/.test(input.height_min) ||
      parseFloat(input.height_min) > parseFloat(input.height_max)
    ) {
      errors.height_min = "height_min must be a number and cannot be greater than height_max";
    }
  
    if (!input.height_max) {
      errors.height_max = "height_max must be completed";
    } else if (
      !/^\d+(\.\d+)?$/.test(input.height_max) ||
      parseFloat(input.height_max) < parseFloat(input.height_min)
    ) {
      errors.height_max = "height_max must be a number and cannot be less than height_min";
    }
  
    if (!input.weight_min) {
      errors.weight_min = "weight_min must be completed";
    } else if (
      !/^\d+(\.\d+)?$/.test(input.weight_min) ||
      parseFloat(input.weight_min) > parseFloat(input.weight_max)
    ) {
      errors.weight_min = "weight_min must be a number and cannot be greater than weight_max";
    }
  
    if (!input.weight_max) {
      errors.weight_max = "weight_max must be completed";
    } else if (
      !/^\d+(\.\d+)?$/.test(input.weight_max) ||
      parseFloat(input.weight_max) < parseFloat(input.weight_min)
    ) {
      errors.weight_max = "weight_max must be a number and cannot be less than weight_min";
    }
  
    if (input.lifeTime && !/^\d+$/.test(input.lifeTime)) {
      errors.lifeTime = "LifeTime must be a number";
    }

  
    return errors;
  }

  

  export default validate;