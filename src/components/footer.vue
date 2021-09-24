<template>
  <footer class="footer">
      <div class="footer-contact">
        <div class="footer-items">
          <span class="footer-icon"><i class="fas fa-map-marker-alt icon-item"></i></span>
          <span class="footer-icons-content">Lane 92 Nguyen Khanh Toan Street, Cau Giay District, Ha Noi</span>
        </div>
        <div class="footer-items">
          <span class="footer-icon" ><i class="fas fa-phone icon-item"></i></span>
          <span class="footer-icons-content">+084 88884444</span>
        </div>
        <div class="footer-items">
          <span class="footer-icon"><i class="far fa-envelope icon-item"></i></span>
          <span class="footer-icons-content">supportcompany.com</span>
        </div>
      </div>
      <div class="about">
        <div class="about-header">
          About the company
        </div>
        <div class="about-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        </div>
      </div>
      <div class="social-btn__container">
        <nav class="social-btn-grp">
          <ul class="footer-social">
            <li  class="footer-icon"><a href="" ><i class="fab fa-twitter"></i></a></li>
            <li  class="footer-icon"><a href="" ><i class="fab fa-facebook-f"></i></a></li>
            <li  class="footer-icon"><a href="" ><i class="fab fa-instagram"></i></a></li>
          </ul>
        </nav>
      </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style>
 footer {
        margin: 0;
        padding-top: .2em;
      }

      .line-2 {
        height: 2px;
        width: 100%;
        margin: .5em auto;
      }

      .footer-contact {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        margin-top: 1em;
        padding: 2em 1.5em;
      }

      .footer-items {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .footer-items .icon-item {
        font-size: 1.25rem;
        padding: .3em;
        text-align: center;
        color: white;
      }

      .footer-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #585858;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: .5em 1em;
      }

      .footer-icon a i {
        margin: auto;
      }

      .footer-icons-content  {
        margin: 1em;
        font-size: 0.85rem;
      }

      .about {
        padding: 0 2.7em;
        margin-top: .5em;
      }

      .about-header {
        font-weight: 600;
        margin-bottom: 1em;
      }

      .footer-social {
        display: flex;
        flex-direction: row;
        margin: .5em 0 0 2em;
      }

      .footer-social li  {
        margin: 1em 0.5em 2em 0.5em;
        border-radius: 0;
        color: white;
      }

      .footer-social li i {
        color: white;
        font-size: 1.5rem;
      }

      @media (min-width: 600px) {
        footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 2fr 1fr;
        }

        .about {
          margin-top: 4em;
        }

        .social-btn__container {
          grid-column: 2;
        }

        .footer-contact {
          padding-bottom: 0;
        }
      }
    </style>


