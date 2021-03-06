pageflow.encodedFile = {
  stageMapping: {
    uploading: {
      activeStates: ['uploading'],
      finishedStates: ['not_uploaded_to_s3', 'upload_to_s3', 'uploading_to_s3', 'upload_to_s3_failed', 'waiting_for_encoding', 'encoding', 'encoded', 'encoding_failed'],
      failedStates: ['upload_failed']
    },
    uploading_to_s3: {
      activeStates: ['uploading_to_s3'],
      finishedStates: ['waiting_for_encoding', 'encoding', 'encoded', 'encoding_failed'],
      failedStates: ['upload_to_s3_failed']},
    encoding: {
      activeStates: ['waiting_for_encoding', 'encoding'],
      finishedStates: ['encoded'],
      failedStates: ['encoding_failed']
    }
  },

  isReady: function() {
    return this.get('state') === 'encoded';
  },

  isFailed: function() {
    return this.get('state').match(/_failed$/);
  },

  isPending: function() {
    return !this.isUploading() && !this.isReady() && !this.isFailed();
  },

  isRetryable: function() {
    return ['upload_to_s3_failed', 'encoding_failed'].indexOf(this.get('state')) >= 0;
  },
};