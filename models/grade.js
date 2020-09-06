export default (mongoose) => {
    const schema = mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      subject: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
        min:[0, 'Minimum value required is 0']
      },
      lastModified: {
        type: Date,
        required: true,
      }
    });
  
    const Grade = mongoose.model('grade', schema);
  
    return Grade;
  };
  