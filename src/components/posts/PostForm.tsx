import { FiImage } from 'react-icons/fi';

export default function PostForm() {
  const handeFileUpload = () => {};
  return (
    <form className='post-form'>
      <textarea
        className='post-form__textarea'
        required
        name='content'
        id='content'
        placeholder='What is happening?'
      />
      <div className='post-form__submit-area'>
        <label htmlFor='file-input' className='post-form__file'>
          <FiImage className='port-form__file-icon' />
        </label>
        <input
          type='file'
          name='file-input'
          accept='image/*'
          onChange={handeFileUpload}
          className='hidden'
        />
        <input type='submit' value='Tweet' className='post-form__submit-btn' />
      </div>
    </form>
  );
}
