import "../styles/info.css";
import Footer from "../layouts/Footer";
import SingleTheme from "../components/header-components/SingleTheme";

const Info = () => {
  return (
    <>
      <main className="main-terminos">
        <SingleTheme />
        <section>
          <h2 id="terminos">Terms and Conditions</h2>
          <p>
            By subscribing to The Fluent Spanish House, you agree to receive
            marketing emails. We will use your information to send you
            notifications about new events and publications related to exclusive
            content. If you have chosen a class plan, we will inform you about
            possible schedule changes and provide the required information, as
            well as direct communication between students and the teacher. You
            can unsubscribe at any time through the link provided in our emails.
            For more details on how we handle your data, please see our{" "}
            <a href="#privacy">Privacy Policy.</a> Thank you for choosing The
            Fluent Spanish House for your Spanish learning.{" "}
          </p>
        </section>
        <section>
          <h2 id="privacy">Privacy Policy</h2>
          <p>
            <strong>Effective Date: 7/28/2024</strong>
            Introduction At The Fluent Spanish House, we value your privacy and
            are committed to protecting your personal data. This privacy policy
            describes how we collect, use, and protect your information.
            Information We Collect We collect the following information when you
            subscribe to our services: Name Email address Information about the
            selected lesson plan Information about direct communication between
            students and teacher Use of Information We use your information for
            the following purposes: Send notifications about new events and
            exclusive posts Inform about possible changes to class schedules
            Provide required information and facilitate direct communication
            between students and teacher Send marketing and promotional emails
            Sharing Information We do not share your personal information with
            third parties except when necessary to comply with the law or to
            protect our rights. Information Security We implement appropriate
            security measures to protect your personal information from
            unauthorized access, alteration, disclosure, or destruction. User
            Rights You have the right to access, correct, update, and request
            deletion of your personal data at any time. You may also unsubscribe
            from our marketing communications at any time by using the link
            provided in our emails. Changes to this Privacy Policy We may update
            this privacy policy from time to time. We will notify you of any
            changes by posting the new policy on our website and, if the changes
            are significant, we will send you an email notification. Contact If
            you have any questions about this privacy policy or how we handle
            your information, please contact us at mar411geca@gmail.com. Links
            to Other Websites Our website may contain links to other websites of
            interest. However, once you have used these links to leave our site,
            you should note that we do not have any control over that other
            website. Therefore, we cannot be responsible for the protection and
            privacy of any information which you provide whilst visiting such
            sites and such sites are not governed by this privacy policy.
            Consent By using our services, you agree to this privacy policy.
            Thank you for trusting The Fluent Spanish House for your Spanish
            learning
          </p>
        </section>
        <section>
          <h2 id="license">License</h2>
          <p>
            The content and code of this website are subject to the terms of the
            license specified in our LICENSE file. You can review the full
            license in our{" "}
            <a
              href="https://github.com/karlosvas/thefluentspanishhouse/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Info;
